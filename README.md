# Google-Docs-Esque-Typing-Game

## Project description

Typing game presented as a document editor, with live statistics and configurable play settings.

## Architecture

`App.tsx` composes the editor-like shell; UI components isolate document, navigation, tools, stats, and modals; `GameContext` owns gameplay state; `data/` supplies word and quote content.

## Technology

React • TypeScript • Vite

## Run locally

`npm install && npm run dev`

## Repository guide

The implementation is organized so that entry points remain thin and domain-specific logic stays in the modules named above. Configuration, assets, and deployment files are kept separate from application code. Review the source tree before changing behavior, and keep secrets in local environment files rather than committing them.
