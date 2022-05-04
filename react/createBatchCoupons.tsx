import React, { FC, useState, useEffect } from 'react'
import { Layout, PageBlock, Button, Input, Textarea } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'



const createBatchCoupons: FC = () => {
  const [utmsource, setUtmsource] = useState('');
  const [utmcampaign, setUtmcampaign] = useState('');
  const [coupons, setCoupons] = useState('');
  const [campaignError, setCampaignError] = useState(false)
  const [sourceError, setSourceError] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [buttonDisabled, setbuttonDisabled] = useState(true)

  const checkCouponChars = (content: string) => {
    const regex = new RegExp(/^[a-zA-Z-0-9\_\-\n]+$/);
    return regex.test(content)
  }

  useEffect(() => {
    // Update the document title using the browser API
    toggleButton();
  });

 const checkUtmChars = (content: string) => {
    const regex = new RegExp(/^[a-zA-Z-0-9\_\-]+$/);
    return regex.test(content)
  }

  const handleCouponChange = (values: any) => {
    var allGood = (checkCouponChars(values.target.value) && values.target.value.length>0)
    if(allGood){
      setCouponError(false)
      setCoupons(values.target.value)

    } else {
      setCouponError(true)
      setCoupons('')
    }


  }
  const handleSourceChange = (values: any) => {
    var allGood = (checkUtmChars(values.target.value) && values.target.value.length>0)
    if(allGood){
      setSourceError(false)
      setUtmsource(values.target.value)
    } else {
      setSourceError(true)
      setUtmsource('');
    }
  }
  const handleCampaignChange = (values: any) => {

    var allGood = (checkUtmChars(values.target.value) && values.target.value.length>0)
    if(allGood){
      setCampaignError(false)
      setUtmcampaign(values.target.value)

    } else {
      setCampaignError(true)
      setUtmcampaign('');
    }

  }
  const runBatch = function(){
    alert("interaction is nice");
  }
  const toggleButton= function(){
    console.log(couponError)
      console.log(sourceError)
      console.log(campaignError)
      console.log(coupons.length)
      console.log(utmcampaign.length);
      console.log(utmsource.length)
    if(!couponError && !sourceError && !campaignError && coupons.length>0 && utmcampaign.length>0 && utmsource.length>0){

      console.log("ENABLE!!!!")
      setbuttonDisabled(false);
    }
    else{
      console.log("DISABLE!!!!")
      setbuttonDisabled(true);
    }
  }
 /* let countCoupons=function(coupons: string){
    setCoupons(coupons);
  }*/
  //console.log(utmsource, utmcampaign, coupons)
  return (
    <Layout>
      <PageBlock
        variation="full"
        title="Mass coupon Creation"
        subtitle="Creates multiple coupons at once."
      >
        <h1>Create coupons</h1>
        <p>This tool allows mass import of coupons.<br/>Add the utms and coupon codes and click "Run mass creation"</p>
        <p><strong>WARNING</strong><br/>This will create individual coupons. If you make mistakes, you will need to archive the coupons by hand!</p>
        <Input
        label="UTM_Source"
        id="UTMSOURCE"
        error={sourceError}
        onChange={handleSourceChange}

        />
        <Input
        label="UTM_Campaign"
        id="UTMCAMP"
        onChange={handleCampaignChange}
        error={campaignError}
      //onChange={setUtmcampaign('')}

        />
        <Textarea
        label="Coupons"
        id="Couponfield"
        error={couponError}
        helpText={<span>Insert one coupon per line, no comma, no special characters</span>}
        onChange={handleCouponChange}
       // onChange={countCoupons('')}
        />
        <Button
          id="createBatchButton"
          onClick={runBatch}
          variation="primary"
          disabled={buttonDisabled}

          >
            <FormattedMessage id="admin-couponbatch.launchbutton" />
          </Button>
      </PageBlock>
    </Layout>
  )
}

export default createBatchCoupons
