// 添加读取yaml的方法
import { parse } from 'yaml';
import * as path from 'path';
import * as fs from 'fs';

export const getEnv = () => {
  return process.env.RUNNING_ENV || 'dev';
};

export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  return parse(file);
};
