import {useEffect, useMemo, useRef} from 'react';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import PropTypes from "prop-types";
import 'highlight.js/styles/github-dark.min.css';

Markdown.propTypes = {
    inversion: PropTypes.bool,
    error: PropTypes.bool,
    text: PropTypes.string,
    loading: PropTypes.bool,
    asRawText: PropTypes.bool,
}

function Markdown({inversion, error, text, loading, asRawText}) {
    const textRef = useRef(null);
    const highlightBlock = (str, lang) => {
        return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy"> 复制 </span></div><code class="hljs overflow-x-scroll code-block-body ${lang}">${str}</code></pre>`
    }

    const mdi = useMemo(() => {
        const md = new MarkdownIt({
            html: false,
            linkify: true,
            highlight(code, language) {
                const validLang = !!(language && hljs.getLanguage(language));
                const lang = language ?? '';
                const highlightedCode = validLang ? hljs.highlight(code, {language: lang}).value
                    : hljs.highlightAuto(code).value;
                return highlightBlock(highlightedCode, lang);
            },
        });
        md.use(mila, {attrs: {target: '_blank', rel: 'noopener'}});
        md.use(mdKatex, {blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000'});
        return md;
    }, []);

    const wrapClass = `text-wrap min-w-[20px] rounded-md ${'px-3 py-2'} ${inversion ? 'bg-[#d2f9d1] dark:bg-[#a1dc95] message-request' : 'bg-[#f4f6f8] dark:bg-[#1e1e20] message-reply'} ${error ? 'text-red-500' : ''}`;

    const renderedText = asRawText ? text : mdi.render(text ?? '');

    useEffect(() => {
        addCopyEvents();
        return removeCopyEvents;
    });


    function copyToClip(code) {
        return navigator.clipboard.writeText(code);
    }

    const addCopyEvents = () => {
        if (textRef.current) {
            const copyBtn = textRef.current.querySelectorAll('.code-block-header__copy')
            copyBtn.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const code = btn.parentElement?.nextElementSibling?.textContent
                    if (code) {
                        copyToClip(code).then(() => {
                            btn.textContent = '已复制'
                            setTimeout(() => {
                                btn.textContent = ' 复制 '
                            }, 1000)
                        })
                    }
                })
            })
        }
    }

    const removeCopyEvents = () => {
        if (textRef.current) {
            const copyBtn = textRef.current.querySelectorAll('.code-block-header__copy')
            copyBtn.forEach((btn) => {
                btn.removeEventListener('click', () => {
                })
            })
        }
    }

    return (
        <div className={`text-black ${wrapClass}`}>
            <div ref={textRef} className="leading-relaxed break-words">
                {!inversion && (
                    <>
                        {!asRawText ? (
                            <div className={`markdown-body ${loading ? 'markdown-body-generate' : ''}`}
                                 dangerouslySetInnerHTML={{__html: renderedText}}/>
                        ) : (
                            <div className="whitespace-pre-wrap">{renderedText}</div>
                        )}
                    </>
                )}
                {inversion && <div className="whitespace-pre-wrap">{renderedText}</div>}
            </div>
        </div>
    );
}

export default Markdown;


