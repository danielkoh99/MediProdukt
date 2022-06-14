import React from 'react';
import { createRealmContext } from '@realm/react';
import { scheme } from '../models/productModel';
const RealmConfig = { schema: [scheme] };
export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(RealmConfig);
