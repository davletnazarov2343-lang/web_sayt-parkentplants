/**
 * webpack `require.context` tiplari (Next.js ichida ishlaydi; @types/webpack-env
 * o'rnatilmagan, shu sabab minimal e'lon). Faqat registr (index.ts) ishlatadi.
 */
declare namespace NodeJS {
  interface Require {
    context(
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp,
    ): {
      keys(): string[];
      (id: string): unknown;
    };
  }
}
