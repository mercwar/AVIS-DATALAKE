#include <windows.h>
#include <stdio.h>
#include "yaml.h"  // libyaml

// Function to execute the VB6 /MAKE command found in YAML
void Run_VB6_Compile_Job(const char* projectPath, const char* outDir) {
    char cmd[1024];
    
    // Construct the command: "VB6.EXE /MAKE <vbp> /OUTDIR <dir>"
    sprintf(cmd, "\"C:\\Program Files (x86)\\Microsoft Visual Studio\\VB98\\VB6.EXE\" /MAKE %s /OUTDIR %s", 
            projectPath, outDir);
            
    printf("[AVIS] Launching Job: %s\n", cmd);
    
    // Execute the compilation job
    int result = system(cmd);
    
    if (result == 0) {
        printf("[AVIS] Success: VB6 GUI Lane Compiled.\n");
    } else {
        printf("[AVIS] Error: Compiler returned code %d\n", result);
    }
}

// Minimal YAML parser to find the 'compile_vbp' action
void Parse_Avis_Jobs(const char* yamlData) {
    yaml_parser_t parser;
    yaml_event_t event;
    yaml_parser_initialize(&parser);
    yaml_parser_set_input_string(&parser, (unsigned char*)yamlData, strlen(yamlData));

    char current_lane[64] = "";
    char current_action[64] = "";

    while (yaml_parser_parse(&parser, &event)) {
        if (event.type == YAML_SCALAR_EVENT) {
            const char* value = (const char*)event.data.scalar.value;
            
            // Basic logic: Match 'lane' then find its 'action'
            if (strcmp(value, "VB6_GUI") == 0) strcpy(current_lane, "VB6_GUI");
            if (strcmp(value, "compile_vbp") == 0) {
                // If this is the GUI lane, execute the compile job
                if (strcmp(current_lane, "VB6_GUI") == 0) {
                    Run_VB6_Compile_Job("temp_project.vbp", "./bin");
                }
            }
        }
        if (event.type == YAML_STREAM_END_EVENT) break;
        yaml_event_delete(&event);
    }
    yaml_parser_delete(&parser);
}
