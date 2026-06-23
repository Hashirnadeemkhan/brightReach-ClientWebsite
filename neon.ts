import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set — Neon queries will fail."
    );
  }
  _sql = neon(url);
  return _sql;
}

// Lazy proxy: `neon()` is only invoked on first actual query (at request time),
// not at module import — so the build's page-data collection step doesn't fail
// when DATABASE_URL is absent on the build machine.
export const sql: NeonQueryFunction<false, false> = new Proxy(
  (() => {}) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, _thisArg, args) {
      return (getSql() as (...a: unknown[]) => unknown)(...args);
    },
    get(_target, prop) {
      const real = getSql() as unknown as Record<string | symbol, unknown>;
      return real[prop];
    },
  }
);
