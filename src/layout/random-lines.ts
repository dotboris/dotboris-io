import { useEffect, useReducer } from "react"

export function useRandomLines(initalFirstLine: string) {
  const [state, dispatch] = useReducer(reducer, getInitalState(initalFirstLine))
  useEffect(
    () => {
      const timer = setInterval(() => dispatch({ type: "tickTimer" }), 50)
      return () => clearInterval(timer)
    },
    []
  )

  function startNewLine() {
    const parts = Array.from(
      Array(Math.floor(Math.random() * 5) + 2),
      () => Math.floor(Math.random() * 100000).toString()
    )

    dispatch({ type: "pushLine", line: parts.join(" ") })
  }

  return {
    lines: normalizeLines(state.lines, state.typedLettersCount),
    startNewLine,
  }
}

type State = {
  lines: string[]
  typedLettersCount: number
}

type Action =
  | { type: 'pushLine', line: string }
  | { type: 'tickTimer' }

function getInitalState(initalFirstLine: string): State {
  return {
    lines: [initalFirstLine],
    typedLettersCount: 0,
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "pushLine":
      return {
        ...state,
        lines: [action.line, ...state.lines],
        typedLettersCount: 0,
      }
    case "tickTimer":
      return {
        ...state,
        typedLettersCount: Math.min(
          state.typedLettersCount + 1,
          state.lines[0].length
        )
      }
    default:
      return state
  }
}

function normalizeLines(lines: string[], typedLettersCount: number) {
  const [firstLine, ...otherLines] = lines
  const typedFirstLine = firstLine.substring(0, typedLettersCount)

  if (typedLettersCount > 0) {
    return [typedFirstLine, ...otherLines]
  } else {
    return otherLines
  }
}
