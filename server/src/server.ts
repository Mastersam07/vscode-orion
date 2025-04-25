import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    InitializeParams,
    DidChangeConfigurationNotification,
    CompletionItem,
    TextDocumentPositionParams,
    TextDocumentSyncKind,
    InitializeResult
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// After the server has started the client sends an initialize request.
// The server receives the initialize params and
// needs to return the capabilities of the server.
connection.onInitialize((params: InitializeParams) => {
    const capabilities = params.capabilities;

    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            // Tell the client that the server supports code completion
            completionProvider: {
                resolveProvider: true
            },
            // Tell the client that the server supports hover
            hoverProvider: true,
            // Tell the client that the server supports go to definition
            definitionProvider: true,
            // Tell the client that the server supports find references
            referencesProvider: true,
            // Tell the client that the server supports document symbols
            documentSymbolProvider: true
        }
    };

    return result;
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
    // Here we can validate the document and send diagnostics
    // We'll implement this later
});

// This handler provides the initial list of completion items.
connection.onCompletion(
    (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
        // We'll implement completion later
        return [];
    }
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
    (item: CompletionItem): CompletionItem => {
        // We'll implement completion resolve later
        return item;
    }
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen(); 