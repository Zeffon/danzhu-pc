import React from "react";
import { UrlProps } from "types/url";

export const File = ({ url }: UrlProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      src={`https://view.officeapps.live.com/op/view.aspx?src=${url}`}
      width="100%"
      height="100%"
      frameBorder="1"
    />
  );
};
