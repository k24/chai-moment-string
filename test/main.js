'use strict';

const chai = require('chai')
  , expect = chai.expect
  , momentString = require('../');

chai.use(momentString);

describe('chai-moment-string', () => {
  describe('expect(a).to.momentFormat(format)', () => {
    it('should fail a is not valid moment format string', () => {
      try {
        expect('some random string').to.momentFormat('YYYY-MM-DD');
      }
      catch (err) {
        return;
      }

      throw new Error('it should fail');
    });

    it('should pass if a is valid moment format string', () => {
      expect('It is 2015').to.momentFormat('YYYY');
      expect('It is 2015-12-12').to.momentFormat('YYYY-MM-DD');
      expect('It is 2015-12-12 00:00').to.momentFormat('YYYY-MM-DD HH:mm');
      expect('It is 2015-12-12 00:00:12').to.momentFormat('YYYY-MM-DD HH:mm:ss');
      expect('2015').to.momentFormat('YYYY');
      expect('2015-12-12').to.momentFormat('YYYY-MM-DD');
      expect('2015-12-12 00:00').to.momentFormat('YYYY-MM-DD HH:mm');
      expect('2015-12-12 00:00:12').to.momentFormat('YYYY-MM-DD HH:mm:ss');
    });
  });

  describe('expect(a).to.momentFormat(format, locale)', () => {
    it('should fail a is not valid moment format string with locale', () => {
      try {
        // fr locale but expected en
        expect('2012 juillet').to.momentFormat('YYYY MMMM', 'en');
      }
      catch (err) {
        return;
      }

      throw new Error('it should fail');
    });

    it('should pass if a is valid moment format string with locale', () => {
      expect('It is 2012 juillet').to.momentFormat('YYYY MMMM', 'fr');
      expect('It is 2012 July').to.momentFormat('YYYY MMMM', 'en');
      expect('2012 juillet').to.momentFormat('YYYY MMMM', 'fr');
      expect('2012 July').to.momentFormat('YYYY MMMM', 'en');
    });
  });

  describe('expect(a).to.momentFormat.strict(format)', () => {
    it('should fail a is not valid strict moment format string', () => {
      try {
        expect('It is 2015').to.momentFormat.strict('YYYY');
      }
      catch (err) {
        return;
      }

      throw new Error('it should fail');
    });

    it('should pass if a is valid strict moment format string', () => {
      expect('2015').to.momentFormat.strict('YYYY');
      expect('2015-12-12').to.momentFormat.strict('YYYY-MM-DD');
      expect('2015-12-12 00:00').to.momentFormat.strict('YYYY-MM-DD HH:mm');
      expect('2015-12-12 00:00:12').to.momentFormat.strict('YYYY-MM-DD HH:mm:ss');
    });
  });

  describe('expect(a).to.momentFormat.strict(format, locale)', () => {
    it('should fail a is not valid strict moment format string with locale', () => {
      try {
        // Same as locale but not exact
        expect('It is 2015 juillet').to.momentFormat.strict('YYYY MMMM', 'fr');
      }
      catch (err) {
        return;
      }

      throw new Error('it should fail');
    });

    it('should pass if a is valid strict moment format string with locale', () => {
      expect('2012 juillet').to.momentFormat.strict('YYYY MMMM', 'fr');
      expect('2012 July').to.momentFormat.strict('YYYY MMMM', 'en');
    });
  });
});
