const rutLikePattern = (): RegExp => /^(\d{0,2})\.?(\d{3})\.?(\d{3})-?(\d|k)$/gi;
const suspiciousRutPattern = (): RegExp => /^(\d)\1?\.?(\1{3})\.?(\1{3})-?(\d|k)?$/gi;

export const isRutLike = (rut: string): boolean => rutLikePattern().test(rut);
export const isSuspiciousRut = (rut: string): boolean => suspiciousRutPattern().test(rut);
export const cleanRut = (rut: string): string => isRutLike(rut) ? rut.replace(/[^0-9k]/gi, '') : '';
export const getRutDigits = (rut: string): string => cleanRut(rut).slice(0, -1);
export const getRutVerifier = (rut: string): string => cleanRut(rut).slice(-1);

type DeconstructedRut = {
  digits: string;
  verifier: string;
};
export const deconstructRut = (rut: string): DeconstructedRut => ({
  digits: getRutDigits(rut),
  verifier: getRutVerifier(rut),
});

export enum RutFormat {
  DOTS,
  DASH,
  DOTS_DASH,
};

export const formatRut = (rut: string, format = RutFormat.DASH): string => {
  if (!isRutLike(rut)) return rut;

  switch (format) {
    case RutFormat.DOTS:
      return rut.replace(
        rutLikePattern(),
        (...args) => `${args[1] ? `${args[1]}.` : ''}${args[2]}.${args[3]}${args[4]}`
      );

    case RutFormat.DASH:
      return rut.replace(rutLikePattern(), '$1$2$3-$4');

    case RutFormat.DOTS_DASH:
      return rut.replace(
        rutLikePattern(),
        (...args) => `${args[1] ? `${args[1]}.` : ''}${args[2]}.${args[3]}-${args[4]}`
      );

    default:
      return rut.replace(rutLikePattern(), '$1$2$3$4');
  }
};

export const calculateRutVerifier = (digits: string): string => {
  let sum = 0;
  let mul = 2;

  let i = digits.length;
  while (i--) {
    sum = sum + parseInt(digits.charAt(i)) * mul;
    if (mul % 7 === 0) { mul = 2; }
    else { mul++; }
  }

  const res = sum % 11;

  if (res === 0) { return '0'; }
  else if (res === 1) { return 'k'; }

  return `${(11 - res)}`;
};

export const validateRut = (rut: string, noSuspicious = true): boolean => {
  if (!isRutLike(rut)) return false;
  if (noSuspicious && isSuspiciousRut(rut)) return false;
  if (getRutVerifier(rut) !== calculateRutVerifier(getRutDigits(rut))) return false;
  return true;
};

type RutListResult = Map<string, boolean>;
export const validateRutList = (ruts: string[], noSuspicious = true): RutListResult => {
  return ruts.reduce<RutListResult>((result, rut) => {
    result.set(rut, validateRut(rut, noSuspicious));
    return result;
  }, new Map<string, boolean>());
};

export const generateRut = (): string => {
  const digits = Math.floor(10000003 + Math.random() * 90000000).toString();
  const verifier = calculateRutVerifier(digits);
  return formatRut(digits + verifier);
};
