enum ErrorCodes {
  NOT_SUPPORTED,

}

interface iErrorMessages {
  [key: string]: string
}

const ErrorMessages: iErrorMessages = {
  [ErrorCodes.NOT_SUPPORTED]: 'Your browser does not support WebAudio API.',
};


export { ErrorCodes, ErrorMessages };
