export interface HSLUpdate {
  h?: number
  s?: number
  l?: number
  a?: number
}

export class HSL {
  constructor(
    public readonly h: number,
    public readonly s: number,
    public readonly l: number,
    public readonly a?: number,
  ) {}

  get css(): string {
    const base = `${this.h} ${this.s}% ${this.l}%`

    if (this.a != null) {
      return `hsl(${base} / ${this.a}%)`
    } else {
      return `hsl(${base})`
    }
  }

  with(update: HSLUpdate): HSL {
    return new HSL(
      update.h ?? this.h,
      update.s ?? this.s,
      update.l ?? this.l,
      update.a ?? this.a,
    )
  }

  lighten(percentage: number): HSL {
    return this.with({ l: this.l + this.l * (percentage / 100) })
  }

  darken(percentage: number): HSL {
    return this.lighten(-percentage)
  }
}
