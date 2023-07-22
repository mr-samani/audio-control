export const NETWORK_STATES: any = {
    0: 'NETWORK_EMPTY', //   0	There is no data yet. Also, readyState is HAVE_NOTHING.
    1: 'NETWORK_IDLE', //   	1	HTMLMediaElement is active and has selected a resource, but is not using the network.
    2: 'NETWORK_LOADING', //   2	The browser is downloading HTMLMediaElement data.
    3: 'NETWORK_NO_SOURCE', //   3	No HTMLMediaElement src found.
}