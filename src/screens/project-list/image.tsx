import React from "react";
import { UrlProps } from "types/url";

export const Image = ({ url }: UrlProps) => {
  // eslint-disable-next-line jsx-a11y/img-redundant-alt
  return <img src={url} height="500" width="800" alt="Image preview..." />;
};
