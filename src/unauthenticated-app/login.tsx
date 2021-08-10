import React from "react";
import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { getUrlParam } from "utils";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const { user } = useAuth();

  const handleSubmit = async (values: {
    account: string | null;
    password: string;
    type: number;
  }) => {
    const account = getUrlParam("s");
    values.type = 2;
    values.account = account;
    try {
      await run(
        login(values).catch((e) => {
          onError(e);
        })
      );
    } catch (e) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <UserPanel>
        <Avatar src={user?.avatarUrl} />
        <div>{user?.nickName}</div>
      </UserPanel>
      <Panel>
        <Title>请输入提取码：</Title>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "请输入提取码" }]}
        >
          <Main>
            <SmallInput placeholder={"提取码"} id={"password"} />
            <SmallButton loading={isLoading} htmlType={"submit"}>
              提取文件
            </SmallButton>
          </Main>
        </Form.Item>
      </Panel>
    </Form>
  );
};

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  margin-bottom: 1.8rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const SmallInput = styled(Input)`
  width: 30.2rem;
  height: 3.8rem;
`;

const SmallButton = styled(Button)`
  color: #fff;
  font-size: 1.2rem;
  height: 3.6rem;
  background-color: #09aaff;
  border-color: #09aaff;
  margin-left: 1.4rem;
  :hover,
  .ant-btn:focus {
    color: #fff;
    background: #0098ea;
    border-color: #0098ea;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 8rem;
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Avatar = styled.img`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  margin-right: 1rem;
`;
