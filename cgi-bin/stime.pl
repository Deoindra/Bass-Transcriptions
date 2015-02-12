#!/usr/bin/perl
print "Content-type: text/html\n\n";

#print "stime\n";
#@timedata = gmtime(time);
#print join(' ', @timedata);
#print "\n\n<br/>";

($second, $minute, $hour, $dayOfMonth, $month, $yearOffset, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time);
print "$dayOfMonth.$month.$yearOffset\r\n";

