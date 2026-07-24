declare global {
  interface Window {
    loadPyodide?: any;
    pyodide?: any;
  }
}

export interface PyodideExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  testPassed?: boolean;
}

let pyodidePromise: Promise<any> | null = null;

export async function loadPyodideInstance(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("Pyodide can only run in browser client.");
  }

  if (window.pyodide) {
    return window.pyodide;
  }

  if (pyodidePromise) {
    return pyodidePromise;
  }

  const indexURL = typeof window !== "undefined" && (window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    : "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/";

  pyodidePromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      window.loadPyodide({ indexURL })
        .then((pyodide: any) => {
          window.pyodide = pyodide;
          resolve(pyodide);
        })
        .catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    script.onload = () => {
      if (window.loadPyodide) {
        window.loadPyodide({ indexURL })
          .then((pyodide: any) => {
            window.pyodide = pyodide;
            resolve(pyodide);
          })
          .catch(reject);
      } else {
        reject(new Error("Failed to load Pyodide script."));
      }
    };
    script.onerror = () => reject(new Error("Network error loading Pyodide WebAssembly module."));
    document.head.appendChild(script);
  });

  return pyodidePromise;
}

export async function executePythonCode(
  pythonCode: string,
  testAssertion?: string
): Promise<PyodideExecutionResult> {
  try {
    const pyodide = await loadPyodideInstance();

    // Prepare stdout capture in Python
    const setupCode = `
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`;
    await pyodide.runPythonAsync(setupCode);

    // Run user code
    await pyodide.runPythonAsync(pythonCode);

    // Get captured stdout
    const getStdoutCode = `sys.stdout.getvalue()`;
    const output: string = await pyodide.runPythonAsync(getStdoutCode);

    let testPassed = true;
    if (testAssertion && testAssertion.trim()) {
      try {
        // Run test assertion in JS context evaluating output
        const evalTest = new Function("output", `return (${testAssertion});`);
        testPassed = Boolean(evalTest(output));
      } catch (err: any) {
        testPassed = false;
      }
    }

    return {
      success: true,
      output: output || "(Code executed with no output)",
      testPassed
    };
  } catch (err: any) {
    return {
      success: false,
      output: err?.message || String(err),
      error: err?.message || String(err),
      testPassed: false
    };
  }
}
