import React from "react";
import { Button, Modal } from "antd";
import { Project } from "../../types/project";
import { File } from "./file";
import { Image } from "./image";

interface FileViewProps {
  file: Project | undefined;
  visible: boolean;
  setVisible: (param: boolean) => void;
}

export const FileView = ({ file, visible, setVisible }: FileViewProps) => {
  return (
    <Modal
      closable={false}
      visible={visible}
      centered
      width={1000}
      footer={[
        <Button type="primary" onClick={() => setVisible(false)}>
          确定
        </Button>,
      ]}
    >
      <div style={{ width: "80rem", height: "50rem" }}>
        {file?.category === 2 ? (
          <File url={file?.url} />
        ) : (
          <Image url={file?.url} />
        )}
      </div>
    </Modal>
  );
};
