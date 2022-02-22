// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from 'react';
import styles from './Definition.module.css';

interface RpcDefinitionDescriptionProps {
  children: ReactNode;
}

export default function RpcDefinitionDescription({
  children
}: RpcDefinitionDescriptionProps) {
  return <div className={styles['rpc-definition-description']}>{children}</div>;
}
