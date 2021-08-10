import React, { useState } from "react";
import dayjs from "dayjs";
import { Space, Table, TableProps, Tag, Tooltip } from "antd";
import { Project } from "types/project";
import { download } from "utils/file";
import { FileView } from "./file-view";

interface ListProps extends TableProps<Project> {}

export const List = ({ ...props }: ListProps) => {
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState<Project>();

  return (
    <div>
      <Table
        loading
        rowKey={(record) => record.file_id}
        columns={[
          {
            title: "上传者",
            dataIndex: "wx_info",
            sorter: (a, b) =>
              a.wx_info.nickName.localeCompare(b.wx_info.nickName),
            render: (value) => {
              return (
                <Tooltip title={value.nickName}>
                  <img
                    src={value.avatarUrl}
                    alt={"头像"}
                    style={{
                      float: "left",
                      width: "3rem",
                      height: "3rem",
                      marginRight: "0.6rem",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    className="ellipsis"
                    style={{ float: "left", maxWidth: "100%" }}
                  >
                    {value.nickName.substring(0, 20)}
                  </div>
                </Tooltip>
              );
            },
          },
          {
            title: "文件名",
            dataIndex: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (value) => {
              return (
                <Tooltip title={value}>
                  <div
                    className="ellipsis"
                    style={{ float: "left", maxWidth: "100%" }}
                  >
                    {value.substring(0, 30)}
                  </div>
                </Tooltip>
              );
            },
          },
          {
            title: "类型",
            dataIndex: "category",
            render: (value, record) => {
              const text = value === 1 ? "图片" : "文件";
              const color = value === 1 ? "green" : "geekblue";
              return <Tag color={color}>{text}</Tag>;
            },
          },
          {
            title: "大小",
            dataIndex: "size",
            sorter: (a, b) => a.size - b.size,
            render: (value, record) => {
              let text = "";
              if (value > 1024) {
                text = Math.round(value / 1024) + " kb";
              }
              if (value > 1048576) {
                text = (value / (1024 * 1024)).toFixed(2) + " MB";
              }
              return <div>{text}</div>;
            },
          },
          {
            title: "上传时间",
            render(value, record) {
              return (
                <span>
                  {record.create_time
                    ? dayjs(record.create_time).format("YYYY-MM-DD HH:mm")
                    : "无"}
                </span>
              );
            },
          },
          {
            title: "操作",
            render: (value, record) => (
              <Space size="middle">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  onClick={() => {
                    setRecord(record);
                    setVisible(true);
                  }}
                >
                  预览
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={() => download(record.url, record.title)}>下载</a>
              </Space>
            ),
          },
        ]}
        {...props}
      />
      <FileView
        file={record}
        visible={visible}
        setVisible={() => setVisible(false)}
      />
    </div>
  );
};
