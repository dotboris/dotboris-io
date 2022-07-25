import { useEffect, useReducer } from "react"

export function useRandomLines(initialFirstLine: string, allLines: string[]) {
  const [state, dispatch] = useReducer(reducer, getInitialState(initialFirstLine, allLines))
  useEffect(
    () => {
      const timer = setInterval(() => dispatch({ type: "tickTimer" }), 50)
      return () => clearInterval(timer)
    },
    []
  )

  return {
    lines: normalizeLines(state.lines, state.typedLettersCount),
    startNewLine: () => dispatch({ type: "startNewLine" }),
  }
}

type State = {
  lines: string[]
  typedLettersCount: number
  allLines: string[]
  recentlySeenIndexes: number[]
}

type Action =
  | { type: 'startNewLine' }
  | { type: 'tickTimer' }

function getInitialState(initialFirstLine: string, allLines: string[]): State {
  return {
    lines: [initialFirstLine],
    typedLettersCount: 0,
    allLines,
    recentlySeenIndexes: [],
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "startNewLine": {
      const recentlySeenIndexes = new Set(state.recentlySeenIndexes)
      const nextIndex = pickRandomNumberExcept(
        state.allLines.length,
        recentlySeenIndexes
      )

      const maxLineMemory = Math.floor(state.allLines.length * 0.5)
      const newRecentlySeenIndexes = [
        ...state.recentlySeenIndexes,
        nextIndex
      ].slice(-maxLineMemory)

      return {
        ...state,
        lines: [state.allLines[nextIndex], ...state.lines],
        typedLettersCount: 0,
        recentlySeenIndexes: newRecentlySeenIndexes,
      }
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

function pickRandomNumberExcept(exclusiveMax: number, except: Set<number>): number {
  let count = 0
  let res

  do {
    res = Math.floor(Math.random() * exclusiveMax)
    count += 1
    // We try a few times and it fails we keep whatever value we got
  } while (count < 10 && except.has(res))

  return res
}

function normalizeLines(lines: string[], typedLettersCount: number) {
  const [firstLine, ...otherLines] = lines

  // We split the string into an array using the spread operator so that it gets
  // split by character while respecting unicode. This makes it so that emoji
  // that are composed of multiple characters stick together.
  const typedFirstLine = [...firstLine].slice(0, typedLettersCount).join("")

  if (typedLettersCount > 0) {
    return [typedFirstLine, ...otherLines]
  } else {
    return otherLines
  }
}
