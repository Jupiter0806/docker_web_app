export function wrapResponse(res: object, name: string): object {
  return {
    status: { code: 0, message: "" },
    [name.toString()]: res
  };
}
