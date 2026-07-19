/**
 * @file cbor_avis_match.h
 * @brief Native String and Pattern Matching Verification Architecture
 * @note Evaluates extracted configuration fields against static validation expressions.
 */

#ifndef CBOR_AVIS_MATCH_H
#define CBOR_AVIS_MATCH_H

#include <stdio.h>
#include <stdbool.h>
#include <string.h>

/* ==========================================================================
 * PATTERN COMPLIANCE MATCH ENGINE
 * ========================================================================== */

/**
 * @brief Checks if a string exactly matches a specific static literal configuration value.
 */
bool avis_match_literal(const char *input, const char *expected) {
    if (input == NULL || expected == NULL) {
        return false;
    }
    return (strcmp(input, expected) == 0);
}

/**
 * @brief Validates if a string input begins with a required identifier token pattern.
 */
bool avis_match_prefix(const char *input, const char *prefix) {
    if (input == NULL || prefix == NULL) {
        return false;
    }
    size_t prefix_len = strlen(prefix);
    size_t input_len = strlen(input);
    
    if (input_len < prefix_len) {
        return false;
    }
    return (strncmp(input, prefix, prefix_len) == 0);
}

/**
 * @brief Wildcard matching utility helper supporting simple single-character '?' and multi-character '*' patterns.
 */
bool avis_match_wildcard(const char *string, const char *pattern) {
    if (string == NULL || pattern == NULL) {
        return false;
    }

    // Process characters while pattern elements are available
    while (*pattern) {
        if (*pattern == '*') {
            // Collapse subsequent duplicate wildcards
            while (*pattern == '*') {
                pattern++;
            }
            // If the pattern ends in a wildcard, any remaining input string is verified valid
            if (*pattern == '\0') {
                return true;
            }
            // Test matching paths iteratively down the rest of the string line
            while (*string) {
                if (avis_match_wildcard(string, pattern)) {
                    return true;
                }
                string++;
            }
            return false; // Trailing string mismatches remaining rule constraints
        } 
        else if (*pattern == '?') {
            if (*string == '\0') {
                return false; // Wildcard character placeholder demands a target byte
            }
            string++;
            pattern++;
        } 
        else {
            if (*string != *pattern) {
                return false; // Standard direct scalar character literal mismatch
            }
            string++;
            pattern++;
        }
    }
    return (*string == '\0' && *pattern == '\0');
}

#endif /* CBOR_AVIS_MATCH_H */
