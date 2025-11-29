"use client";

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Footer from '@/components/Footer';

import styles from './plans.module.css'
import { RiPlantFill } from 'react-icons/ri';
import { FaHandshake } from 'react-icons/fa';
import { FaFileLines } from 'react-icons/fa6';
import { fetchActiveProductsAndPrices, PriceInfo, getCheckoutUrl } from './stripePayment';
import { useRouter } from "next/navigation";
import { useAuth } from '@/components/AuthContext';
import Auth from '@/components/Auth';

export default function Page() {
    const router = useRouter();

    const [products, setProducts] = useState<PriceInfo[]>([])

    const [activeDiv, setActiveDiv] = useState<'div1' | 'div2' | null>(null);

    const { currentUser, isLoggedIn, isModalOpen, openModal, closeModal} = useAuth()

    const checkoutProcedure = async (product: PriceInfo) => {
        if(!isLoggedIn || !currentUser) {
            openModal()
            return
        }
        if (product.priceType === 'recurring'){
            setActiveDiv('div2')

        }else {
            setActiveDiv('div1')
        }

        const checkoutURL = await getCheckoutUrl(product);
        router.push(checkoutURL);
    }

    useEffect(() => {
        async function loadProducts() {
            const products = await fetchActiveProductsAndPrices()
            setProducts(products)
        }

        loadProducts()
    },[])

    if(products.length === 0) {
        return (<></>)
    }

    let monthlyProduct = products[0];
    let yearProduct  = products[1]

    if(products[1].priceType === 'recurring') {
        monthlyProduct = products[1];
        yearProduct  = products[0]
    }


  return (
    <div>
    {
        isModalOpen && (
          <Auth onClose={closeModal} />
        )
      }
        <div className={styles.wrapper}>
            <div className={styles.plan}>
                <div className={styles.header__wrapper}>
                    <div className={styles.plan__header}>
                        <div className={styles.plan__title}>Get unlimited access to man amazing books to read</div>
                        <div className={styles.plan__subtitle}>Turn ordinary moments into amazing learning opportunities</div>
                        <figure className={styles.img__wrapper}>
                            <Image src="/assets/pricing-top.png" width={860} height={722} alt="pricing" />
                        </figure>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.container}>
                        <div className={styles.features__wrapper}>
                            <div className={styles.plan__features}>
                                <figure className={styles.feature__icon}>
                                    <FaFileLines size={60}/>
                                </figure>
                                <div className={styles.feature__text}>
                                    <b>Key ideas in few min</b> with many books to read
                                </div>
                            </div>
                            <div className={styles.plan__features}>
                                <figure className={styles.feature__icon}>
                                    <RiPlantFill size={60}/>
                                </figure>
                                <div className={styles.feature__text}>
                                    <b>3 million</b> people growing with Summarist everyday
                                </div>
                            </div>
                            <div className={styles.plan__features}>
                                <figure className={styles.feature__icon}>
                                    <FaHandshake size={60}/>
                                </figure>
                                <div className={styles.feature__text}>
                                    <b>Precise recommendations</b> collections curated by experts
                                </div>
                            </div>
                        </div>
                        <div className={styles.section__title}>Choose the plan that fits you</div>
                        <div className={`${styles.plan__card} ${activeDiv === 'div1' ? styles.card__active : ''}`.trim()} onClick={() => checkoutProcedure(yearProduct)}>
                            <div className={styles.circle}>
                                {activeDiv === 'div1' && <div className={styles.card__dot}></div>}
                            </div>
                            <div className={styles.card__contents}>
                                <div className={styles.card__title}>Premium Plus Yearly</div>
                                <div className={styles.card__price}>$99.99/year</div>
                                <div className={styles.card_subtitle}>7-day free trial included</div>
                            </div>
                        </div>
                        <div className={styles.card__seperator}>or</div>
                        <div className={`${styles.plan__card} ${activeDiv === 'div2' ? styles.card__active : ''}`.trim()} onClick={() => checkoutProcedure(monthlyProduct)}>
                            <div className={styles.circle}>
                                {activeDiv === 'div2' && <div className={styles.card__dot}></div>}
                            </div>
                            <div className={styles.card__contents}>
                                <div className={styles.card__title}>Premium Monthly</div>
                                <div className={styles.card__price}>$9.99/month</div>
                                <div className={styles.card_subtitle}>No trial included</div>
                            </div>
                        </div>
                        <div className={styles["plan__card--cta"]}>
                            <span className={styles["btn--wrapper"]}>
                                <button className={styles["btn"]}><span>Start your free 7-day trial</span></button>
                            </span>
                            <div className={styles["plan__disclaimer"]}>Cancel your trial at any time before it ends, and you won’t be charged.</div>
                            <div className={styles["plan__disclaimer"]}>Use test card No. 4242424242424242, any 3 numbers and any future date to test payment function  </div>
                        </div>
                        <details className={`${styles["collapsible__details"]} border-b border-gray-300 mb-2 overflow-hidden`} >
                            {/* <!-- 标题和箭头区域 (summary) --> */}
                            <summary className="flex justify-between items-center py-6 cursor-pointer select-none transition duration-150">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                                    How does the free 7-day trial work?
                                </h3>
                                
                                {/* <!-- 箭头图标 (使用 SVG 嵌入) --> */}
                                <svg className={`${styles["arrow-icon"]} w-6 h-6 text-gray-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </summary>
                            
                            {/* <!-- 详细内容区域 --> */}
                            <div className={`${styles["collapsible-content-wrapper"]} text-gray-600`}>
                                <p className="min-h-px pb-6 text-[#394547] leading-normal ">
                                    Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                                </p>
                            </div>
                        </details>
                        <details className={`${styles["collapsible__details"]} border-b border-gray-300 mb-2 overflow-hidden`} >
                            {/* <!-- 标题和箭头区域 (summary) --> */}
                            <summary className="flex justify-between items-center py-6 cursor-pointer select-none transition duration-150">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                                    Can I switch subscriptions from monthly to yearly, or yearly to monthly?
                                </h3>
                                
                                {/* <!-- 箭头图标 (使用 SVG 嵌入) --> */}
                                <svg className={`${styles["arrow-icon"]} w-6 h-6 text-gray-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </summary>
                            
                            {/* <!-- 详细内容区域 --> */}
                            <div className={`${styles["collapsible-content-wrapper"]} text-gray-600`}>
                                <p className="min-h-px pb-6 text-[#394547] leading-normal ">
                                    While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                                </p>
                            </div>
                        </details>
                        <details className={`${styles["collapsible__details"]} border-b border-gray-300 mb-2 overflow-hidden`} >
                            {/* <!-- 标题和箭头区域 (summary) --> */}
                            <summary className="flex justify-between items-center py-6 cursor-pointer select-none transition duration-150">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                                    What&apos;s included in the Premium plan?
                                </h3>
                                
                                {/* <!-- 箭头图标 (使用 SVG 嵌入) --> */}
                                <svg className={`${styles["arrow-icon"]} w-6 h-6 text-gray-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </summary>
                            
                            {/* <!-- 详细内容区域 --> */}
                            <div className={`${styles["collapsible-content-wrapper"]} text-gray-600`}>
                                <p className="min-h-px pb-6 text-[#394547] leading-normal ">
                                    Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                                </p>
                            </div>
                        </details>
                        <details className={`${styles["collapsible__details"]} border-b border-gray-300 mb-2 overflow-hidden`} >
                            {/* <!-- 标题和箭头区域 (summary) --> */}
                            <summary className="flex justify-between items-center py-6 cursor-pointer select-none transition duration-150">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                                    Can I cancel during my trial or subscription?
                                </h3>
                                
                                {/* <!-- 箭头图标 (使用 SVG 嵌入) --> */}
                                <svg className={`${styles["arrow-icon"]} w-6 h-6 text-gray-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </summary>
                            
                            {/* <!-- 详细内容区域 --> */}
                            <div className={`${styles["collapsible-content-wrapper"]} text-gray-600`}>
                                <p className="min-h-px pb-6 text-[#394547] leading-normal ">
                                    You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
