import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as sinon from 'sinon';
import * as Joi from '@hapi/joi';

import Model from './Model';

const schema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

export default class User extends Model {
  id: string;
  password: string;
  firstname: string;
  lastname: string;

  public static fromJson(json: any): User {
    return Model.fromJson(json, schema) as User;
  }
}

describe("Model", () => {
  describe('parses from json', () => {
    it('with all data', () => {
      const user = {
        id: 'id',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname'
      };
      sinon.assert.match(
        User.fromJson(user),
        user
      );
    });

    it('with missing data', () => {
      const user = {
        id: 'id',
        password: 'password',
        firstname: 'firstname',
      };
      try {
        User.fromJson(user);
      } catch (e) {
        expect(e.message).includes(`"lastname" is required`);
      }
    });

    it('with extra data', () => {
      const user = {
        id: 'id',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
        extra: 'extra'
      };
      try {
        User.fromJson(user)
      } catch (e) {
        expect(e.message).includes(`"extra" is not allowed`);
      }
    })
  });
});