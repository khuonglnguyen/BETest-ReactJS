interface NavigateFunction {
  (
    to: To,
    options?: { replace?: boolean; state?: State }
  ): void;
  (delta: number): void;
}