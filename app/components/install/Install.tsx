"use client";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Install() {
    const t = useTranslations('install');
    const [order, setOrder] = useState(1);

    const qas = [
        {
            index: 1,
            question: t('faq_question_1'),
            answer: t('faq_answer_1'),
        },
        {
            index: 2,
            question: t('faq_question_2'),
            answer: t('faq_answer_2'),
        },
        {
            index: 3,
            question: t('faq_question_3'),
            answer: t('faq_answer_3'),
        },
        {
            index: 4,
            question: t('faq_question_4'),
            answer: t('faq_answer_4'),
        },
        {
            index: 5,
            question: t('faq_question_5'),
            answer: t('faq_answer_5'),
        },
        {
            index: 6,
            question: t('faq_question_6'),
            answer: t('faq_answer_6'),
        },
        {
            index: 7,
            question: t('faq_question_7'),
            answer: t('faq_answer_7'),
        }
    ];

    const onChangeOrder = (index: number) => {
        setOrder(index);

        const policyContent = document.querySelector(`.policy-content.s-${index}`);
        if (policyContent) {
            policyContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    return (
        <section className="policy content sec-mar">
            <div className="container">
                <h6 className="mt-3 s-glitter-text name-cmt">{t('faq')}</h6>
                <hr />
                <div className="row">
                    <div className="col-lg-6">
                        {qas.map((qa) => (
                            <div
                                key={uuidv4()}
                                className={classNames(`policy-content s-${qa.index}`, {
                                    show: order === qa.index
                                })}>
                                <h3>{qa.question}</h3>
                                <p>
                                    {qa.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-6">
                        {qas.map((qa) => (
                            <div
                                key={uuidv4()}
                                className={classNames(`policy-item s-${qa.index}`, {
                                    show: order === qa.index
                                })} onClick={() => onChangeOrder(qa.index)}>
                                <span className="d-inline-block policy-icon">
                                    <i className="fal fa-plus plus" />{" "}
                                    <i className="fal fa-times minus" />
                                </span>
                                <h3>{qa.question}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}