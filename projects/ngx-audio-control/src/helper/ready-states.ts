export const READY_STATES: any = {
    0: 'HAVE_NOTHING',//	0	No information is available about the media resource.
    1: 'HAVE_METADATA',//1	Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.
    2: 'HAVE_CURRENT_DATA',//	2	Data is available for the current playback position, but not enough to actually play more than one frame.
    3: 'HAVE_FUTURE_DATA',//	3	Data for the current playback position as well as for at least a little bit of time into the future is available (in other words, at least two frames of video, for example).
    4: 'HAVE_ENOUGH_DATA',//	4	Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.
};