import { transform } from '@babel/core';
import fs from 'fs';
import plugin from './index';

const code = fs.readFileSync(`${__dirname}/in.js`).toString();

const transformedCode = transform(code, {
  plugins: [plugin],
  code: true,
  ast: false
}).code;

fs.writeFileSync(`${process.cwd()}/out.js`, transformedCode);
