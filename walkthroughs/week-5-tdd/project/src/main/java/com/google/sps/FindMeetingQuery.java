// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collections;
import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.TreeSet;

public final class FindMeetingQuery {
    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        List<TimeRange> reservedMeetingsMandatory = new ArrayList<>(); //times that aren't available
        List<TimeRange> availableMeetingsMandatory = new ArrayList<>(); //times to be returned for query
        List<TimeRange> reservedMeetingsOptional = new ArrayList<>();
        List<TimeRange> availableMeetingsOptional = new ArrayList<>();
        findConflicts(reservedMeetingsMandatory, reservedMeetingsOptional, events, request);
        condenseTimeConflicts(reservedMeetingsMandatory);
        condenseTimeConflicts(reservedMeetingsOptional);
        findFreeSlots(reservedMeetingsMandatory, availableMeetingsMandatory, 
            request.getDuration());
        findFreeSlots(reservedMeetingsOptional, availableMeetingsOptional,
            request.getDuration());
        List<TimeRange> resultingTimes = new ArrayList<>();
        //No times for either mandatory or optional attendees, return empty collection
        if (request.getAttendees().isEmpty() && availableMeetingsOptional.isEmpty()) {
            return new ArrayList<>();
        }
        //condense free times for optional and mandatory attendees if
        //there are available optional meetings
        if (!availableMeetingsOptional.isEmpty()) {
            for (TimeRange mTime : availableMeetingsMandatory) {
                for (TimeRange oTime : availableMeetingsOptional) {
                    if (mTime.contains(oTime)) {
                        resultingTimes.add(
                            TimeRange.fromStartEnd(
                                oTime.start(), oTime.end(), false)
                        );
                    }
                }
                if ((!resultingTimes.isEmpty() &&
                    !mTime.contains(resultingTimes.get(resultingTimes.size() - 1)) &&
                    !reservedMeetingsOptional.contains(mTime)) ||
                    resultingTimes.isEmpty()) {
                    resultingTimes.add(mTime);
                }
            }
            return resultingTimes;
        }
        //no optional meetings available so return only mandatory meeting times
        return availableMeetingsMandatory;
    }

    //find all times that conflict with attendess of given request
    private void findConflicts(List<TimeRange> reservedMeetings,
        List<TimeRange> optionalMeetings, Collection<Event> events, 
        MeetingRequest request) {
        for (Event event : events) {
            TimeRange time = event.getWhen();
            for (String attendee : request.getAttendees()) {
                if (!reservedMeetings.contains(time) &&
                    event.getAttendees().contains(attendee) && 
                    time.duration() > 0 ) {
                    reservedMeetings.add(time);
                }
            }
            for (String optAttendee : request.getOptionalAttendees()) {
                if (!optionalMeetings.contains(time) &&
                    event.getAttendees().contains(optAttendee) && 
                    time.duration() > 0 ) {
                    optionalMeetings.add(time);
                }
            }
        }
        Collections.sort(reservedMeetings, TimeRange.ORDER_BY_START);
        Collections.sort(optionalMeetings, TimeRange.ORDER_BY_START);
    }

    //condense all the redundant times that conflict with current request
    private void condenseTimeConflicts(List<TimeRange> reservedMeetings) {
        int i = 0;
        while (i < reservedMeetings.size()-1) {
            TimeRange firstTime = reservedMeetings.get(i);
            TimeRange secondTime = reservedMeetings.get(i+1);
            if (!firstTime.overlaps(secondTime)) {
                i++;
                continue;
            }
            if (firstTime.contains(secondTime.start()) 
                && firstTime.contains(secondTime.end())) {
                reservedMeetings.remove(i+1);
                continue;
            }
            TimeRange condensedTime = TimeRange.fromStartEnd(
                firstTime.start(), secondTime.end(), false);
            reservedMeetings.add(i, condensedTime);
            reservedMeetings.remove(i+2);
            reservedMeetings.remove(i+1);
        }
    }

    private Collection<TimeRange> findFreeSlots(List<TimeRange> reservedMeetings,
        List<TimeRange> availableMeetings, long duration) {
        if (reservedMeetings.size() > 0) { //conflicts present, find available times
            TimeRange temp = TimeRange.fromStartEnd(0, reservedMeetings.get(0).start(), false);
            if (temp.duration() >= duration) { //check if space between day start and first meeting is large enough
                availableMeetings.add(temp);
            }
            temp = TimeRange.fromStartEnd(reservedMeetings.get(reservedMeetings.size() - 1).end(),
                TimeRange.END_OF_DAY, true);
            if (temp.duration() >= duration) { //check if space between day end and first meeting is large enough
                availableMeetings.add(temp);
            }
            for (int j = 0; j < reservedMeetings.size() - 1; j++) {
                temp = TimeRange.fromStartDuration(
                    reservedMeetings.get(j).end(),
                    (reservedMeetings.get(j+1).start() - reservedMeetings.get(j).end())
                );
                if (temp.duration() >= duration) { //check if space between day end and first meeting is large enough
                    availableMeetings.add(temp);
                }
            }
        }
        else if (duration < TimeRange.WHOLE_DAY.duration()){ //no meeting conflicts, whole day is free
            availableMeetings.add(TimeRange.WHOLE_DAY);
        }
        Collections.sort(availableMeetings, TimeRange.ORDER_BY_START);
        return availableMeetings;
    }
}
