import {
  isRutLike,
  isSuspiciousRut,
  cleanRut,
  getRutDigits,
  getRutVerifier,
  calculateRutVerifier,
  validateRut,
  formatRut,
  generateRut,
  RutFormat,
} from '../main';

describe('isRutLike', () => {
  it('Should validate Regex pattern for a rut-like string', () => {
    const validCases: string[] = [
      '9.999.999-9',
      '14355245-5',
      '34566754-k',
      '12.344.568-4',
      '32.456.356-k',
      '543.567-6',
    ];
    const invalidCases: string[] = [
      '23.432.432-t',
      'dfsg24rfr2f3-',
      '13.354322-g',
      '13424-2',
    ];

    validCases.forEach(rut => {
      expect(isRutLike(rut)).toEqual(true);
    });

    invalidCases.forEach(rut => {
      expect(isRutLike(rut)).toEqual(false);
    });
  });
});

describe('isSuspiciousRut', () => {
  it('Should validate Regex pattern for a suspicious-rut string', () => {
    const validCases = [
      '11.111.111-1',
      '2.222.222-k',
      '22222222',
    ];
    const invalidCases = [
      '18585543-0',
      '2s222t222-k',
      '23.432.432-t',
      'dfsg24rfr2f3-',
      '13.354322-g',
      '13424-2',
    ];
    
    validCases.forEach(rut => {
      expect(isSuspiciousRut(rut)).toEqual(true);
    });

    invalidCases.forEach(rut => {
      expect(isSuspiciousRut(rut)).toEqual(false);
    });
  });
});

describe('cleanRut', () => {
  it('Should clean a rut-like string or return an empty string', () => {
    expect(cleanRut('13.543.343-k')).toEqual('13543343k');
    expect(cleanRut('22456765-3')).toEqual('224567653');
    expect(cleanRut('11111111-1')).toEqual('111111111');
    expect(cleanRut('fnekcsnsdk')).toEqual('');
    expect(cleanRut('')).toEqual('');
    expect(cleanRut('35fdlp34/d')).toEqual('');
  });
});

describe('getRutDigits', () => {
  it('Should get the digits of rut-like string or an empty string', () => {
    expect(getRutDigits('13.543.343-k')).toEqual('13543343');
    expect(getRutDigits('fnekcsnsdk')).toEqual('');
  });
});

describe('getRutVerifier', () => {
  it('Should get the verifier of rut-like string or an empty string', () => {
    expect(getRutVerifier('13.543.343-k')).toEqual('k');
    expect(getRutVerifier('fnekcsnsdk')).toEqual('');
  });
});

describe('calculateRutVerifier', () => {
  it('Should calculate the verifier for provided digits', () => {
    const tests = [
      ['7775735', 'k'],
      ['18585543', '0'],
      ['18348353', '6'],
    ];

    tests.forEach(([digits, expectedVerifier]) => {
      expect(calculateRutVerifier(digits)).toEqual(expectedVerifier);
    });
  });
})

describe('validateRut', () => {
  it('Should validate a rut-like string', () => {
    const validRuts = ['7775735-k', '18585543-0', '18348353-6'];
    const invalidRuts = ['', '9.999.999-9', '14355245-5', '34566754-k', '12.344.568-4', '32.456.356-k'];

    validRuts.forEach(test => {
      expect(validateRut(test)).toEqual(true);
    });

    invalidRuts.forEach(test => {
      expect(validateRut(test)).toEqual(false);
    });
  });

  it('Should skip suspicious-rut validation when toggling noSuspicious param', () => {
    const suspiciousValidRuts = ['11111111-1', '22222222-2', '99999999-9'];
    const suspiciousInvalidRuts = ['3333333-3', '2222222-k', ''];

    suspiciousValidRuts.forEach(rut => {
      const on = validateRut(rut);
      const off = validateRut(rut, false);

      expect(on).toEqual(false);
      expect(off).toEqual(true);
    });

    suspiciousInvalidRuts.forEach(rut => {
      const on = validateRut(rut, true);
      const off = validateRut(rut, false);

      expect(on).toEqual(false);
      expect(off).toEqual(false);
    });
  });
});

describe('formatRut', () => {
  it('Should format a rut-like string or return it intact', () => {
    const longrutLikeStr = '44.333.222-1';
    const shortutLikeStr = '333.222-1';

    expect(formatRut(longrutLikeStr)).toEqual('44333222-1');
    expect(formatRut(longrutLikeStr, RutFormat.DASH)).toEqual('44333222-1');
    expect(formatRut(longrutLikeStr, RutFormat.DOTS_DASH)).toEqual('44.333.222-1');
    expect(formatRut(longrutLikeStr, RutFormat.DOTS)).toEqual('44.333.2221');
    expect(formatRut(longrutLikeStr, null)).toEqual('443332221');

    expect(formatRut(shortutLikeStr)).toEqual('333222-1');
    expect(formatRut(shortutLikeStr, RutFormat.DASH)).toEqual('333222-1');
    expect(formatRut(shortutLikeStr, RutFormat.DOTS_DASH)).toEqual('333.222-1');
    expect(formatRut(shortutLikeStr, RutFormat.DOTS)).toEqual('333.2221');
    expect(formatRut(shortutLikeStr, null)).toEqual('3332221');

    expect(formatRut('ne93jkdf39f-')).toEqual('ne93jkdf39f-');
    expect(formatRut('')).toEqual('');
  });
});

describe('generateRut', () => {
  it('Should generate valid Ruts', () => {
    let runs = 100;

    while (runs--) {
      expect(validateRut(generateRut())).toEqual(true);
    }
  });
});
