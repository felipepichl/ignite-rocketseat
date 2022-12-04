import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { exec } from 'node:child_process';
import util from 'node:util';
import crypto from 'node:crypto';

import fs from 'fs';
import path from 'path';

import type { Config } from '@jest/types';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;
  private prismaLocation: string;


  constructor(config: Config.ProjectConfig) {
    super(config);

    this.schema = `test_${crypto.randomUUID()}.db`;
    this.connectionString = `file:./${this.schema}`;
    this.prismaLocation = '--schema=./src/shared/infra/prisma/schema.prisma'
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy ${this.prismaLocation}`)

    return super.setup();
  }

  async teardown() {
    fs.unlinkSync(path.join(__dirname, '..', 'prisma', this.schema));
  }
}
