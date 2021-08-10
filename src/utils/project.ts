import { useAsync } from "./use-async";
import { Project } from "types/project";
import { useEffect } from "react";
import { cleanObject, getUrlParam } from "./index";
import { useHttp } from "./http";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    const s = getUrlParam("s");
    run(client(`link/list/${s}`, { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
