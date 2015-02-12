#!/usr/bin/perl
print "Content-type: text/html\n\n";
($second, $minute, $hour, $dayOfMonth, $month, $yearOffset, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time);
print "$dayOfYear";

