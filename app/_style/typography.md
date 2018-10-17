---
layout: page
title: Typography
category: style
tags:
  - fonts
  - language
  - text
status: ready
---

#### The primary typefaces used in NI Software for Windows are Segoe UI and Verdana.

**Localized application typefaces**  
For non-latin based languages (or languages the don't use an English-like alphabet), the default typeface varies. Fallback typefaces are also provided in case the user does not have the primary font installed.

## IDE typography

**Segoe UI** is the standard typeface for the application UI and documents that are not canvas-style documents.

**IDE typefaces** (with fallbacks)  
These are dynamically assigned based on the user's language setting.  
Use `IdeFont` to reference the correct typeface per language. 

| Language                       | Typeface                         |
| ------------------------------ | -------------------------------- |
| English and English-like       | Segoe UI, Tahoma                  |
| Japanese                       | Meiryo UI, Segoe UI, Tahoma        |
| Chinese                        | Microsoft YaHei, Segoe UI, Tahoma  |
| Korean                         | Malgun Gothic, Segoe UI, Tahoma    |

**IDE font specifics**  
In addition to the typeface, other font attributes are provided as resources.

| Property        | Resource Name      | Value            |
| --------------- | ------------------ | ---------------- |   
| Font size       | `IdeFontSize`      | 12px             |
| Font color      | `IdeTextColor`     | NIBlack (#2B3033)|
| Font weight     | `IdeFontWeight`    | Regular          |

## Diagram typography

**Verdana** is the typeface used on diagrams and other canvas-style documnents.

**Diagram typefaces** (with fallbacks)  
These are dynamically assigned based on the user's language setting.  
Use `DiagramFontFamily` to reference the correct typeface per language.

| Language                       | Typeface                         |
| ------------------------------ | -------------------------------- |
| English and English-like       | Verdana                          |
| Japanese                       | Meiryo UI, Verdana               |
| Chinese                        | Microsoft YaHei, Verdana          |

**Diagram font specifics**  
In addition to the typeface, other font attributes are provided as resources.

| Property        | Resource Name      | Value            |
| --------------- | ------------------ | ---------------- |   
| Font size       | `DiagramFontSize`  | 11px             |
| Font color      | `IdeTextColor`     | NIBlack (#2B3033)|
| Font weight     | `IdeFontWeight`    | Regular          |


## Monospace typography  
When a fixed-width typeface is needed, we use a monospace typeface.

**Monospace typefaces** (with fallbacks)   
Use `MonospaceFont` to reference the monospace typeface.

| Language               | Typeface                              |
| -----------------------| ------------------------------------- |
| All                    | Droid Sans Mono, SimHei, Courier New    |

**Monospace font specifics**  
In addition to the typeface, other font attributes are provided as resources.

| Property        | Resource Name        | Value          |
| --------------- | -------------------- | -------------- |   
| Font size       | `MonospaceFontSize`  | 12px           |