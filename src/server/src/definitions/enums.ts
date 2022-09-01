export enum COMMANDLINE_RESPONSES {
    OK = 'OK',
    ERROR = 'ERROR'
}

export enum SENDER {
    SERVER = 'Server'
}

export enum COMMANDLINE_COMMANDS {
    HELP = 'help'
}

export enum SOCKET_EVENTS {
    CONNECTION = 'connection',                  /** Has to be lowercase due socket.io requirement */
    CONNECT = 'connect',                        /** Has to be lowercase due socket.io requirement */
    DISCONNECT = 'DISCONNECT',
    TICK = 'TICK',
    COMMANDLINE = 'COMMANDLINE',
    SERVER_CONFIGS = 'SERVERCONFIGS',
    AUTHENTICATE = 'AUTHENTICATE'
}


export enum AUTHENTICATOR_RERSPONSES {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL'
    
}