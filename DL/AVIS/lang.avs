/* AIFVS-ARTIFACT : lang.avs
   AVIS-RESOURCE : LANGUAGE-DEFINITION
*/

LANGUAGE AVIS {
    version = "1.0";
    dialects = ["core", "universe3", "datalake"];
}

KEYWORDS {
    k[0] = "AVIS-ARTIFACT";
    k[1] = "AVIS-GUID";
    k[2] = "AVIS-ANCHOR";
    k[3] = "STATE";
    k[4] = "ENTRYPOINT";
    k[5] = "LINKS";
}

GRAMMAR {
    rule[0] = "artifact -> header body footer";
    rule[1] = "header -> '/*' AVIS-ARTIFACT metadata '*/'";
    rule[2] = "body -> sections";
    rule[3] = "sections -> section | section sections";
    rule[4] = "section -> IDENTIFIER '{' pairs '}'";
}
