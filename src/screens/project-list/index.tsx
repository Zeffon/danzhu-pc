import React from "react";
import { List } from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";

export const ProjectListScreen = () => {
  const { isLoading, error, data: list } = useProject();

  return (
    <Container>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
