// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

import React, { ReactNode } from 'react';
import styles from './Definition.module.css';

interface DefinitionHeaderProps {
  name: string;
  children: ReactNode;
}

export default function DefinitionHeader({
  name,
  children
}: DefinitionHeaderProps) {
  return (
    <div className={styles['definition-title']}>
      <span>{name}</span>

      {children}
    </div>
  );
}
