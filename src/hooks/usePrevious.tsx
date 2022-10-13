// import { useEffect } from "react";
import { useHref } from "react-router";

export function usePrevious(value: any) {
  const ref = useHref(value);
  // useEffect(() => {
  //   ref.current = value
  // })
  return ref;
}
