import { run } from '@oclif/core';
import flush from '@oclif/core/flush';

// @ts-ignore ggh
import handle from '@oclif/core/handle';

run().then(flush).catch(handle);