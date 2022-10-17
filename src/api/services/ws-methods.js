import BinarySocket from '../base/socket_base';
import { trackJSNetworkMonitor } from './trackjs';

const WS = BinarySocket;

export default trackJSNetworkMonitor(WS);
