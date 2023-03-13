// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.languages.registerHoverProvider('javascript', {
    provideHover(document, position, token) {
      let editor = vscode.window.activeTextEditor
      const uri = document.uri.toString()
      if (editor && editor.document.uri.toString() === uri) {
        //类型转换
        let selection = editor.selections.find((selection) => {
          return !selection.isEmpty && selection.contains(position)
        })
        if (selection) {
          console.log({
            range: selection,
            comment: editor.document.getText(selection),
          })
        }
      }
      // const range = document.getWordRangeAtPosition(position)
      // const word = document.getText(range)
      // console.log(token)
      return {
        contents: ['Hover Content'],
      }
    },
  })
  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
