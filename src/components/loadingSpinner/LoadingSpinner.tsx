import React from 'react';
import { Flex, Spin } from 'antd';

export const LoadingSpinner: React.FC = () => (
  <Flex gap="middle" vertical style={{ width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <Flex>
      <Spin tip="Loading" size="large">
        <div style={{ padding: 50, borderRadius: 4 }} />
      </Spin>
    </Flex>
  </Flex>
);
