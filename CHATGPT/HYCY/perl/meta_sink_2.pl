# AIFVS-ARTIFACT
# CY_NAME: PERL_META_SINK_2
# CY_TYPE: Logic
# CY_ROLE: Metadata Receiver
# CY_LINK: AVIS-DATALAKE://PERL/SINK/2
#
# DL_MAP: CY_COMMENT_OBJECT
# DL_DRV: PERL
# DL_LDIR: perl
# DL_FILE: meta_sink_2
# DL_EXT: .pl
#
# AVIS_SCHEMA: CGO_v1
# AVIS_VISIBILITY: Public
#
# COMMENT:
# Perl sink receives comment objects.

use strict;
use warnings;

open(my $fh, ">", "received_2.meta") or exit;
while(<STDIN>) {
    print $fh $_;
}
close($fh);
