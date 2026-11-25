# Security

Never commit passwords, tokens, session cookies, API keys or private transcripts.
Report vulnerabilities privately to the repository owner; do not post secrets
in public issues. Reusing native CLI authentication does not prevent agents with
same-user filesystem permissions from accessing credentials. The initial core
does not provide a sandbox or secret broker. Treat all CLI output as untrusted,
redact before persistence/export, and use explicit approval for sensitive actions.
