import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { exec } from 'node:child_process';
import util from 'node:util';
import crypto from 'node:crypto'

import type { Config } from '@jest/types';

//import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    this.schema = `test_${crypto.randomUUID()}.db`;
    this.connectionString = `file:./${this.schema}`
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate up --create-db --experimental`)

    return super.setup();
  }

  async teardown() {
    // const client = new Client({
    //   connectionString: this.connectionString,
    // });
    // await client.connect();
    // await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    // await client.end();
  }
}
