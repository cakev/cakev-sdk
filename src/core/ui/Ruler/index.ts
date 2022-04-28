import './index.scss'
import Guide from '@/core/ui/Guide'
import GuideTip from '@/core/ui/GuideTip'

const bgImgX = new Image()
const bgImgY = new Image()
const see = new Image()
const noSee = new Image()
noSee.src =
	'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuMzU3MjggNi4xMTU1Mkw1LjY4Mzk1IDUuNDQyMThMNi4xMjU1MiA1TDYuOTQyNzkgNS44MTcyN0M3LjU3NjQ4IDUuNTQzNDMgOC4yNjI2MyA1LjQwNjgxIDkgNS40MDY4MUMxMS4wNyA1LjQwNjgxIDEyLjczNjkgNi40ODMyOSAxNCA4LjYzNTAzQzEzLjQzMjggOS42MTY5OCAxMi43NzcxIDEwLjM3NDUgMTIuMDM0MyAxMC45MDgxTDEyLjk3NDEgMTEuODQ4TDEyLjUzMiAxMi4yOTAyTDExLjQ5MjEgMTEuMjQ5N0MxMS40ODg4IDExLjI1MTMgMTEuNDg1NiAxMS4yNTMgMTEuNDgyMyAxMS4yNTQ2TDEwLjI3OSAxMC4wNTE4TDEwLjI4NjkgMTAuMDQ0NUw5LjYxOTY2IDkuMzc3OUM5LjYxNzIzIDkuMzc5OTQgOS42MTQ3OSA5LjM4MTk4IDkuNjEyMzQgOS4zODRMOC4yNzA1NSA4LjA0MjgyTDguMjc2NjUgOC4wMzQ4OUw3LjU5NDc4IDcuMzUyNEM3LjU5Mjc0IDcuMzU1MDQgNy41OTA3MSA3LjM1NzY4IDcuNTg4NjggNy4zNjAzM0w2LjM0NzUyIDYuMTIxMDFMNi4zNTY2NyA2LjExNTUySDYuMzU3MjhaTTEwLjY2MDggOS41MzUyNUMxMC43OTggOS4yNjY4OSAxMC44NzQ4IDguOTYwNzIgMTAuODc0OCA4LjYzNTY0QzEwLjg3NDggNy41NjU4NyAxMC4wMzU2IDYuNjk5OCA5IDYuNjk5OEM4LjY2Mzk0IDYuNjk5OCA4LjM0ODYyIDYuNzkxMjkgOC4wNzU5OSA2Ljk1MTA5TDguODI0MzUgNy42OTk0NEM4Ljg4MTY4IDcuNjg3MjQgOC45NDE0NSA3LjY4MTc1IDkuMDAyNDQgNy42ODE3NUM5LjUxOTY0IDcuNjgxNzUgOS45Mzk4NiA4LjExNDc4IDkuOTM5ODYgOC42NTAyOEM5LjkzOTg2IDguNzAyMTIgOS45MzU1OSA4Ljc1MzM1IDkuOTI3NjcgOC44MDI3NkwxMC42NjA4IDkuNTM1ODZWOS41MzUyNVpNNS44MjMwMSA2LjQ4MDI0TDcuMjU4NzIgNy45MTY1NkM3LjE2OTg0IDguMTQ2MDkgNy4xMjQzNCA4LjM5MDEyIDcuMTI0NTQgOC42MzYyNUM3LjEyNDU0IDkuNzA2MDMgNy45NjQzOCAxMC41NzMzIDkgMTAuNTczM0M5LjI2ODM2IDEwLjU3MzMgOS41MjI2OSAxMC41MTU0IDkuNzUzMjMgMTAuNDExMUwxMC44NzY3IDExLjUzMzlDMTAuMjc2NSAxMS43NTc2IDkuNjQwNDggMTEuODY5NyA5IDExLjg2NDVDNi45MTE2OSAxMS44NjQ1IDUuMjQ0ODIgMTAuNzg4IDQgOC42MzU2NEM0LjUzNDg5IDcuNzI0NDUgNS4xNDI5NiA3LjAwNTM3IDUuODIyNCA2LjQ4MDI0SDUuODIzMDFaTTguOTYwMzYgOS42MTc1OUw4LjA2NzQ2IDguNzI0NjlDOC4xMDM0NCA5LjIxMDc4IDguNDg1ODUgOS41OTY4NSA4Ljk2MDM2IDkuNjE3NTlaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo='
see.src =
	'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgNUM5LjQ1MzYxIDUgOS44OTQ3MiA1LjA2ODg5IDEwLjMyMzMgNS4yMDY2N0MxMC43NTE5IDUuMzQ0NDQgMTEuMTI3OSA1LjUyMzQ3IDExLjQ1MTIgNS43NDM3NUMxMS43NzQ2IDUuOTY0MDMgMTIuMDc4OSA2LjIwNzY0IDEyLjM2NDIgNi40NzQ1OEMxMi42NDk0IDYuNzQxNTMgMTIuODg5MyA3LjAwODQ3IDEzLjA4MzggNy4yNzU0MkMxMy4yNzgyIDcuNTQyMzYgMTMuNDQ2NCA3Ljc4NTk3IDEzLjU4ODMgOC4wMDYyNUMxMy43MzAzIDguMjI2NTMgMTMuODM1IDguNDA1IDEzLjkwMjUgOC41NDE2N0wxNCA4Ljc1QzEzLjk4NDcgOC43ODI1IDEzLjk2NDIgOC44MjYzOSAxMy45MzgzIDguODgxNjdDMTMuOTEyNSA4LjkzNjk0IDEzLjg1MTIgOS4wNDk4NiAxMy43NTQ2IDkuMjIwNDJDMTMuNjU3OSA5LjM5MDk3IDEzLjU1NDkgOS41NTkxNyAxMy40NDU0IDkuNzI1QzEzLjMzNiA5Ljg5MDgzIDEzLjE5MTcgMTAuMDg2MSAxMy4wMTI1IDEwLjMxMDhDMTIuODMzMyAxMC41MzU2IDEyLjY0ODMgMTAuNzQ1IDEyLjQ1NzUgMTAuOTM5MkMxMi4yNjY3IDExLjEzMzMgMTIuMDQwNCAxMS4zMjkyIDExLjc3ODggMTEuNTI2N0MxMS41MTcxIDExLjcyNDIgMTEuMjQ5IDExLjg5MTggMTAuOTc0NiAxMi4wMjk2QzEwLjcwMDEgMTIuMTY3NCAxMC4zOTE0IDEyLjI4MDMgMTAuMDQ4MyAxMi4zNjgzQzkuNzA1MjggMTIuNDU2NCA5LjM1NTgzIDEyLjUwMDMgOSAxMi41QzguNTQ2MzkgMTIuNSA4LjEwNTI4IDEyLjQzMTEgNy42NzY2NyAxMi4yOTMzQzcuMjQ4MDYgMTIuMTU1NiA2Ljg3MjA4IDExLjk3NzEgNi41NDg3NSAxMS43NTc5QzYuMjI1NDIgMTEuNTM4OCA1LjkyMTExIDExLjI5NjggNS42MzU4MyAxMS4wMzIxQzUuMzUwNTYgMTAuNzY3NCA1LjExMDY5IDEwLjUwMjEgNC45MTYyNSAxMC4yMzYzQzQuNzIxODEgOS45NzA0MiA0LjU1MzYxIDkuNzI3OTIgNC40MTE2NyA5LjUwODc1QzQuMjY5NzIgOS4yODk1OCA0LjE2NSA5LjExMDU2IDQuMDk3NSA4Ljk3MTY3TDQgOC43NjY2N0M0LjAxNTI4IDguNzM0MTcgNC4wMzU4MyA4LjY5MDI4IDQuMDYxNjcgOC42MzVDNC4wODc1IDguNTc5NzIgNC4xNDg3NSA4LjQ2NjM5IDQuMjQ1NDIgOC4yOTVDNC4zNDIwOCA4LjEyMzYxIDQuNDQ1MTQgNy45NTQ4NiA0LjU1NDU4IDcuNzg4NzVDNC42NjQwMyA3LjYyMjY0IDQuODA4MzMgNy40MjYyNSA0Ljk4NzUgNy4xOTk1OEM1LjE2NjY3IDYuOTcyOTIgNS4zNTE2NyA2Ljc2MjM2IDUuNTQyNSA2LjU2NzkyQzUuNzMzMzMgNi4zNzM0NyA1Ljk1OTU4IDYuMTc3MDggNi4yMjEyNSA1Ljk3ODc1QzYuNDgyOTIgNS43ODA0MiA2Ljc1MDk3IDUuNjExNjcgNy4wMjU0MiA1LjQ3MjVDNy4yOTk4NiA1LjMzMzMzIDcuNjA4NjEgNS4yMiA3Ljk1MTY3IDUuMTMyNUM4LjI5NDcyIDUuMDQ1IDguNjQ0MTcgNS4wMDExMSA5IDUuMDAwODNWNVpNOSA1LjgzMzMzQzguNjk2MTEgNS44MzMzMyA4LjM5Nzc4IDUuODczNDcgOC4xMDUgNS45NTM3NUM3LjgxMjIyIDYuMDM0MDMgNy41NDgwNiA2LjEzNzY0IDcuMzEyNSA2LjI2NDU4QzcuMDc2OTQgNi4zOTE1MyA2Ljg0Njk0IDYuNTQ1IDYuNjIyNSA2LjcyNUM2LjM5ODA2IDYuOTA1IDYuMjAzODkgNy4wODIzNiA2LjA0IDcuMjU3MDhDNS44NzYxMSA3LjQzMTgxIDUuNzE3MDggNy42MTk1OCA1LjU2MjkyIDcuODIwNDJDNS40MDg3NSA4LjAyMTI1IDUuMjg2MTEgOC4xOTMxOSA1LjE5NSA4LjMzNjI1QzUuMTAzODkgOC40NzkzMSA1LjAxODE5IDguNjIyNSA0LjkzNzkyIDguNzY1ODNDNS4wMTgxOSA4LjkwNjk0IDUuMTAzODkgOS4wNDg2MSA1LjE5NSA5LjE5MDgzQzUuMjg2MTEgOS4zMzMwNiA1LjQwODc1IDkuNTAzNDcgNS41NjI5MiA5LjcwMjA4QzUuNzE3MDggOS45MDA2OSA1Ljg3NjExIDEwLjA4NjIgNi4wNCAxMC4yNTg3QzYuMjAzODkgMTAuNDMxMiA2LjM5ODA2IDEwLjYwNjUgNi42MjI1IDEwLjc4NDZDNi44NDY5NCAxMC45NjI2IDcuMDc2OTQgMTEuMTE0NiA3LjMxMjUgMTEuMjQwNEM3LjU0ODA2IDExLjM2NjMgNy44MTIyMiAxMS40Njg3IDguMTA1IDExLjU0NzlDOC4zOTc3OCAxMS42MjcxIDguNjk2MTEgMTEuNjY2NyA5IDExLjY2NjdDOS4zMDM4OSAxMS42NjY3IDkuNjAyMjIgMTEuNjI2NSA5Ljg5NSAxMS41NDYyQzEwLjE4NzggMTEuNDY2IDEwLjQ1MTkgMTEuMzYyOSAxMC42ODc1IDExLjIzNzFDMTAuOTIzMSAxMS4xMTEyIDExLjE1MzEgMTAuOTU4OCAxMS4zNzc1IDEwLjc3OTZDMTEuNjAxOSAxMC42MDA0IDExLjc5NjEgMTAuNDI0IDExLjk2IDEwLjI1MDRDMTIuMTIzOSAxMC4wNzY4IDEyLjI4MjkgOS44OTAxNCAxMi40MzcxIDkuNjkwNDJDMTIuNTkxMyA5LjQ5MDY5IDEyLjcxMzkgOS4zMTkzMSAxMi44MDUgOS4xNzYyNUMxMi44OTYxIDkuMDMzMTkgMTIuOTgxOCA4Ljg5MTExIDEzLjA2MjEgOC43NUMxMi45ODE4IDguNjA4ODkgMTIuODk2MSA4LjQ2NjgxIDEyLjgwNSA4LjMyMzc1QzEyLjcxMzkgOC4xODA2OSAxMi41OTEzIDguMDA5MzEgMTIuNDM3MSA3LjgwOTU4QzEyLjI4MjkgNy42MDk4NiAxMi4xMjM5IDcuNDIzMTkgMTEuOTYgNy4yNDk1OEMxMS43OTYxIDcuMDc1OTcgMTEuNjAxOSA2Ljg5OTU4IDExLjM3NzUgNi43MjA0MkMxMS4xNTMxIDYuNTQxMjUgMTAuOTIzMSA2LjM4ODc1IDEwLjY4NzUgNi4yNjI5MkMxMC40NTE5IDYuMTM3MDggMTAuMTg3OCA2LjAzNDAzIDkuODk1IDUuOTUzNzVDOS42MDIyMiA1Ljg3MzQ3IDkuMzAzODkgNS44MzMzMyA5IDUuODMzMzNWNS44MzMzM1pNOSA3LjA4MzMzQzkuNDYgNy4wODMzMyA5Ljg1Mjc4IDcuMjQ2MTEgMTAuMTc4MyA3LjU3MTY3QzEwLjUwMzkgNy44OTcyMiAxMC42NjY3IDguMjkgMTAuNjY2NyA4Ljc1QzEwLjY2NjcgOS4yMSAxMC41MDM5IDkuNjAyNzggMTAuMTc4MyA5LjkyODMzQzkuODUyNzggMTAuMjUzOSA5LjQ2IDEwLjQxNjcgOSAxMC40MTY3QzguNTQgMTAuNDE2NyA4LjE0NzIyIDEwLjI1MzkgNy44MjE2NyA5LjkyODMzQzcuNDk2MTEgOS42MDI3OCA3LjMzMzMzIDkuMjEgNy4zMzMzMyA4Ljc1QzcuMzMzMzMgOC4yOSA3LjQ5NjExIDcuODk3MjIgNy44MjE2NyA3LjU3MTY3QzguMTQ3MjIgNy4yNDYxMSA4LjU0IDcuMDgzMzMgOSA3LjA4MzMzWk05IDcuOTE2NjdDOC43NyA3LjkxNjY3IDguNTczNjEgNy45OTgwNiA4LjQxMDgzIDguMTYwODNDOC4yNDgwNiA4LjMyMzYxIDguMTY2NjcgOC41MiA4LjE2NjY3IDguNzVDOC4xNjY2NyA4Ljk4IDguMjQ4MDYgOS4xNzYzOSA4LjQxMDgzIDkuMzM5MTdDOC41NzM2MSA5LjUwMTk0IDguNzcgOS41ODMzMyA5IDkuNTgzMzNDOS4yMyA5LjU4MzMzIDkuNDI2MzkgOS41MDE5NCA5LjU4OTE3IDkuMzM5MTdDOS43NTE5NCA5LjE3NjM5IDkuODMzMzMgOC45OCA5LjgzMzMzIDguNzVDOS44MzMzMyA4LjUyIDkuNzUxOTQgOC4zMjM2MSA5LjU4OTE3IDguMTYwODNDOS40MjYzOSA3Ljk5ODA2IDkuMjMgNy45MTY2NyA5IDcuOTE2NjdWNy45MTY2N1oiIGZpbGw9IiM5OTk5OTkiLz4KPC9zdmc+Cg=='
bgImgX.src =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAIAAACW8RrQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3OEUyMEM3NzkyMTIxMUVCQkZGREJCREZEQzRBQUVFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3OEUyMEM3ODkyMTIxMUVCQkZGREJCREZEQzRBQUVFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4RTIwQzc1OTIxMjExRUJCRkZEQkJERkRDNEFBRUVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc4RTIwQzc2OTIxMjExRUJCRkZEQkJERkRDNEFBRUVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+r9C/twAAAENJREFUeNpilJBWYRh8gElSXHQwOothUIJRZ406a9RZo84adRY9nIW/aqKd7BAJrYEKHjTZ0SRPCmA0NLIchM4CCDAAtx4DyLnOl1UAAAAASUVORK5CYII='
bgImgY.src =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAIAAADeABw2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQkM4MjEwRjkyMTMxMUVCOTlBQUQyOTQ0REY2ODNDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQkM4MjExMDkyMTMxMUVCOTlBQUQyOTQ0REY2ODNDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFCQzgyMTBEOTIxMzExRUI5OUFBRDI5NDRERjY4M0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFCQzgyMTBFOTIxMzExRUI5OUFBRDI5NDRERjY4M0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2HR8RgAAAE5JREFUeNpikZBWkRQXZSARsADx85evSdIDtIaJgSxAX20sJHmJHG3wkBtWQYKZjFhICozRVDKaSkZTyWgqGU0lo6lkNJWMphIiAECAAQCHcyGW+TXwowAAAABJRU5ErkJggg=='

export default class Ruler {
	private guideTip: GuideTip = GuideTip.Instance()
	rulerContainerId: string
	private rulerClassName = { x: 'd-ruler-wrapper-x', y: 'd-ruler-wrapper-y' }
	private rulerId = { x: 'ruler-x', y: 'ruler-y' }
	private rulerVisibleClassName = {
		see: 'd-ruler-visible',
		noSee: 'd-ruler-visible d-ruler-visible-hide',
	}
	/* div容器实际宽高，目前是body的宽高 */
	width: number
	height: number
	/* 大屏实际宽高 */
	screenWidth: number
	screenHeight: number
	zoom: number
	/* x轴0点偏移量 */
	diffX: number
	/* y轴0点偏移量 */
	diffY: number
	/* 拖动偏移量 */
	offsetY: number
	offsetX: number
	/* 标尺高度，容差 */
	private rulerSize = 18
	/* 标尺步长 */
	private stepLength = 50
	/* 标尺可见 */
	rulerVisible = true
	/* 参考线 */
	guideLines = []
	guideLinesDom: { x: HTMLElement | null; y: HTMLElement | null } = {
		x: null,
		y: null,
	}
	canvas: { x: HTMLCanvasElement | null; y: HTMLCanvasElement | null } = {
		x: null,
		y: null,
	}
	context2d = { x: null, y: null }
	ready = false

	constructor(rulerContainerId: string) {
		this.rulerContainerId = rulerContainerId
		this.init()
	}
	init(): void {
		if (this.ready) return
		const fatherX = this.createXFather()
		const fatherY = this.createYFather()
		const canvasX = this.createCanvas('x')
		const canvasY = this.createCanvas('y')
		const guideX = this.createGuideFather('x')
		const guideY = this.createGuideFather('y')
		const rulerVisible = this.createRulerVisible()
		fatherX.appendChild(canvasX)
		fatherY.appendChild(canvasY)
		this.guideTip.init({ type: 'x', father: fatherX })
		this.guideTip.init({ type: 'y', father: fatherY })
		fatherX.appendChild(guideX)
		fatherY.appendChild(guideY)
		document.getElementById(this.rulerContainerId).appendChild(rulerVisible)
		this.ready = true
		window.addEventListener('keyup', this.keyup.bind(this))
		window.addEventListener('resize', this.draw.bind(this))
	}
	/* 跟随画布还原最佳比例，标尺位移 */
	resetZoom({ screenWidth, screenHeight }: any = {}): void {
		if (!isNaN(screenWidth)) this.screenWidth = screenWidth
		if (!isNaN(screenHeight)) this.screenHeight = screenHeight
		const dom: HTMLElement = document.getElementById(this.rulerContainerId)
		const zoom = ~~((dom.offsetWidth / this.screenWidth) * 100) / 100
		const offsetX = (dom.offsetWidth - this.screenWidth) * 0.5
		const offsetY = (dom.offsetHeight - this.screenHeight) * 0.5
		this.draw({
			screenWidth,
			screenHeight,
			zoom,
			offsetX,
			offsetY,
		})
	}
	/* 屏幕大小变化时，标尺整体宽高变化 */
	private windowResize(): void {
		const dom: HTMLElement = document.body
		this.width = dom.offsetWidth
		this.height = dom.offsetHeight
		this.canvas.x.width = this.width
		this.canvas.y.height = this.height
	}
	/* 创建，显示隐藏参考线按钮 */
	private createRulerVisible(): HTMLElement {
		const dom = document.createElement('img')
		dom.className = this.rulerVisibleClassName.see
		dom.style.width = `${this.rulerSize}px`
		dom.style.height = `${this.rulerSize}px`
		dom.src = see.src
		dom.onclick = e => {
			e.stopPropagation()
			e.preventDefault()
			this.rulerVisible = !this.rulerVisible
			if (this.rulerVisible) {
				dom.src = see.src
				dom.className = this.rulerVisibleClassName.see
				this.initGuide()
				this.canvas.x.style.display = 'block'
				this.canvas.y.style.display = 'block'
			} else {
				dom.src = noSee.src
				dom.className = this.rulerVisibleClassName.noSee
				this.clearGuide()
				this.canvas.x.style.display = 'none'
				this.canvas.y.style.display = 'none'
			}
		}
		return dom
	}
	/* 创建，标尺canvas */
	private createCanvas(type: string): HTMLCanvasElement {
		const canvas = document.createElement('canvas')
		canvas.height = this.height
		canvas.id = this.rulerId[type]
		if (type === 'x') {
			canvas.height = this.rulerSize
			canvas.width = this.width
		} else {
			canvas.width = this.rulerSize
			canvas.height = this.height
		}
		this.canvas[type] = canvas
		this.context2d[type] = this.canvas[type].getContext('2d')
		return canvas
	}
	/* 创建，参考线父容器 */
	private createGuideFather(type: string): HTMLElement {
		const dom = document.createElement('div')
		this.guideLinesDom[type] = dom
		return dom
	}
	/* 创建，x轴标尺容器 */
	private createXFather(): HTMLElement {
		const dom = document.createElement('div')
		dom.className = this.rulerClassName.x
		dom.style.width = `calc(100% - ${this.rulerSize}px)`
		document.getElementById(this.rulerContainerId).appendChild(dom)
		this.width = dom.offsetWidth
		dom.onmouseenter = (e: MyMouseEvent) => {
			const t = this.context2d.x.getTransform()
			const num = ~~((e.layerX - t.e) / this.zoom)
			this.guideTip.show({
				rulerVisible: this.rulerVisible,
				type: 'x',
				num,
				offset: e.layerX,
			})
		}
		dom.onmousemove = (e: MyMouseEvent) => {
			const t = this.context2d.x.getTransform()
			const num = ~~((e.layerX - t.e) / this.zoom)
			this.guideTip.show({
				rulerVisible: this.rulerVisible,
				type: 'x',
				num,
				offset: e.layerX,
			})
		}
		dom.onmouseleave = () => {
			this.guideTip.hide({ rulerVisible: this.rulerVisible, type: 'x' })
		}
		dom.onmousedown = (e: MyMouseEvent) => {
			if (e.buttons !== 1 || e.which !== 1) return
			if (this.rulerVisible) {
				const t = this.context2d.x.getTransform()
				const num = ~~((e.layerX - t.e) / this.zoom)
				this.createGuide(num, 'x')
			}
		}
		return dom
	}
	/* 创建参考线 */
	createGuide(num: string | number, type: string): void {
		const guide = new Guide({
			num,
			type,
			father: this.guideLinesDom[type],
			offset: type === 'x' ? this.diffX : this.diffY,
			zoom: this.zoom,
			width: this.width,
			height: this.height,
			rulerSize: this.rulerSize,
		})
		this.guideLines.push(guide)
	}
	/* 创建，y轴标尺容器 */
	private createYFather(): HTMLElement {
		const dom = document.createElement('div')
		dom.className = this.rulerClassName.y
		dom.style.height = `calc(100% - ${this.rulerSize}px)`
		document.getElementById(this.rulerContainerId).appendChild(dom)
		this.height = dom.offsetHeight
		dom.onmouseenter = (e: MyMouseEvent) => {
			const t = this.context2d.y.getTransform()
			const num = ~~((e.layerY - t.f) / this.zoom)
			this.guideTip.show({
				rulerVisible: this.rulerVisible,
				type: 'y',
				num,
				offset: e.layerY,
			})
		}
		dom.onmousemove = (e: MyMouseEvent) => {
			const t = this.context2d.y.getTransform()
			const num = ~~((e.layerY - t.f) / this.zoom)
			this.guideTip.show({
				rulerVisible: this.rulerVisible,
				type: 'y',
				num,
				offset: e.layerY,
			})
		}
		dom.onmouseleave = () => {
			this.guideTip.hide({ rulerVisible: this.rulerVisible, type: 'y' })
		}
		dom.onmousedown = (e: MyMouseEvent) => {
			if (e.buttons !== 1 || e.which !== 1) return
			if (this.rulerVisible) {
				const t = this.context2d.y.getTransform()
				const num = ~~((e.layerY - t.f) / this.zoom)
				this.createGuide(num, 'y')
			}
		}
		return dom
	}
	/* 绘制标尺+参考线 */
	draw({ screenWidth, screenHeight, offsetY, offsetX, zoom }: any = {}): void {
		if (!isNaN(screenWidth)) this.screenWidth = screenWidth
		if (!isNaN(screenHeight)) this.screenHeight = screenHeight
		if (!isNaN(zoom)) this.zoom = zoom
		if (!isNaN(offsetY)) this.offsetY = offsetY
		if (!isNaN(offsetX)) this.offsetX = offsetX
		if (this.ready) {
			this.windowResize()
			const diffX = (this.screenWidth * (1 - this.zoom)) / 2 + this.offsetX
			const diffY = (this.screenHeight * (1 - this.zoom)) / 2 + this.offsetY
			this.diffX = diffX
			this.diffY = diffY
			this.context2d.x.translate(diffX, 0)
			this.context2d.y.translate(0, diffY)
			this.context2d.y.font = '10px sans-serif'
			this.context2d.y.fillStyle = '#999'
			this.context2d.x.font = '10px sans-serif'
			this.context2d.x.fillStyle = '#999'
			this.clearRulerCanvas()
			this.clearGuide()
			this.initDrawX()
			this.initDrawY()
			this.initGuide()
		}
	}
	/* 初始化参考线 */
	private initGuide(): void {
		if (this.rulerVisible)
			this.guideLines.forEach(item => {
				new Guide({
					num: item.num,
					type: item.type,
					father: item.father,
					offset: item.type === 'x' ? this.diffX : this.diffY,
					zoom: this.zoom,
					width: this.width,
					height: this.height,
					rulerSize: this.rulerSize,
				})
			})
	}
	/* Alt+c 清空参考线 */
	private keyup(e): void {
		switch (e.keyCode) {
			case 67: // c
				if (e.altKey) {
					const r = confirm('确定是否清空参考线？')
					if (r) {
						this.clearGuide()
						this.guideLines = []
					}
				}
				break
		}
	}
	/* 清空参考线dom及数据 */
	clearGuides(): void {
		this.clearGuide()
		this.guideLines = []
	}
	/* 清空参考线dom */
	private clearGuide(): void {
		this.guideLinesDom.y.innerHTML = ''
		this.guideLinesDom.x.innerHTML = ''
	}
	/* 清空标尺canvas */
	private clearRulerCanvas(): void {
		const tx = this.context2d.x.getTransform()
		const ty = this.context2d.y.getTransform()
		const wx = this.canvas.x.width - tx.e
		const hx = this.canvas.x.height
		this.context2d.x.clearRect(-tx.e, 0, wx, hx)
		const wy = this.canvas.y.width
		const hy = this.canvas.y.height - ty.e
		this.context2d.y.clearRect(-ty.e, 0, wy, hy)
	}
	/* 绘制x轴标尺 */
	private initDrawX(): void {
		const t = this.context2d.x.getTransform()
		let x = 0
		while (x < this.canvas.x.width - t.e) {
			this.context2d.x.drawImage(bgImgX, x, 0)
			this.context2d.x.fillText(String(~~(x / this.zoom)), x + 4, 10)
			x = x + this.stepLength
		}

		if (t.e > 0) {
			let xe = 0
			while (xe < t.e) {
				xe = xe + this.stepLength
				this.context2d.x.drawImage(bgImgX, -xe, 0)
				this.context2d.x.fillText(String(xe === 0 ? '0' : -~~(xe / this.zoom)), -xe + 2, 10)
			}
		}
	}
	/* 绘制y轴标尺 */
	private initDrawY(): void {
		const t = this.context2d.y.getTransform()
		let y = 0
		while (y < this.canvas.y.height - t.f) {
			this.context2d.y.save()
			this.context2d.y.drawImage(bgImgY, 0, y)
			this.context2d.y.translate(10, y)
			this.context2d.y.rotate(-Math.PI / 2)
			const num = ~~(y / this.zoom)
			this.context2d.y.fillText(String(num), -num.toString().length * 8, 0)
			y = y + this.stepLength
			this.context2d.y.restore()
		}
		if (t.f > 0) {
			let xe = 0
			while (xe < t.f) {
				this.context2d.y.save()
				xe = xe + this.stepLength
				this.context2d.y.drawImage(bgImgY, 0, -xe)
				this.context2d.y.translate(10, -xe + 28)
				this.context2d.y.rotate(-Math.PI / 2)
				this.context2d.y.fillText(String(~~-(xe / this.zoom)), 2, 0)
				this.context2d.y.restore()
			}
		}
	}
}
