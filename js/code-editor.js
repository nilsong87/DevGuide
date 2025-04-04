document.addEventListener('DOMContentLoaded', function() {
    // Initialize Ace Editor
    const editor = ace.edit("code-editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    editor.setFontSize(14);
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
    });

    // Default code for each language
    const defaultCode = {
        javascript: `// Bem-vindo ao editor JavaScript
function helloWorld() {
    return "Olá, Mundo!";
}

// Clique em Executar para ver o resultado
helloWorld();`,
        python: `# Bem-vindo ao editor Python
def hello_world():
    return "Olá, Mundo!"

# Clique em Executar para ver o resultado
hello_world()`,
        cpp: `// Bem-vindo ao editor C++
#include <iostream>
using namespace std;

string helloWorld() {
    return "Olá, Mundo!";
}

int main() {
    // Clique em Executar para ver o resultado
    cout << helloWorld();
    return 0;
}`
    };

    // Language selector
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        const language = this.value;
        switch(language) {
            case 'javascript':
                editor.session.setMode("ace/mode/javascript");
                editor.setValue(defaultCode.javascript);
                break;
            case 'python':
                editor.session.setMode("ace/mode/python");
                editor.setValue(defaultCode.python);
                break;
            case 'cpp':
                editor.session.setMode("ace/mode/c_cpp");
                editor.setValue(defaultCode.cpp);
                break;
        }
    });

    // Run code button
    const runButton = document.getElementById('run-code');
    const outputDiv = document.getElementById('code-output');
    
    runButton.addEventListener('click', function() {
        const language = languageSelect.value;
        const code = editor.getValue();
        
        outputDiv.innerHTML = '<div class="text-muted">Executando código...</div>';
        
        // Simulate code execution (in a real app, you would use a backend service or WebAssembly)
        setTimeout(() => {
            try {
                let result;
                
                switch(language) {
                    case 'javascript':
                        result = eval(code);
                        break;
                    case 'python':
                        // In a real app, you would use Pyodide or a backend service
                        result = "Olá, Mundo! (Simulação)";
                        break;
                    case 'cpp':
                        // In a real app, you would use Emscripten or a backend service
                        result = "Olá, Mundo! (Simulação)";
                        break;
                }
                
                outputDiv.innerHTML = `
                    <div class="text-success">
                        <strong>Saída:</strong> ${JSON.stringify(result)}
                    </div>
                `;
            } catch (error) {
                outputDiv.innerHTML = `
                    <div class="text-danger">
                        <strong>Erro:</strong> ${error.message}
                    </div>
                `;
            }
        }, 500);
    });

    // Reset code button
    const resetButton = document.getElementById('reset-code');
    resetButton.addEventListener('click', function() {
        const language = languageSelect.value;
        editor.setValue(defaultCode[language]);
        outputDiv.innerHTML = '';
    });

    // Set initial code
    editor.setValue(defaultCode.javascript);
});