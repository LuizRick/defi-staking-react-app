import { HomePageData } from "../../pages";
import * as React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { useAppEthereumContext } from "../../context/AppEthereumContext";
import styles from "./StakingForm.module.css";

interface StakingFormProps {
  data: HomePageData;
}

export default function StakingForm({ data }: StakingFormProps) {
  const context = useAppEthereumContext();
  if (data.loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.bgColor}>
            <div className="d-flex p-t1">
              <div>
                {context.web3?.utils.fromWei(
                  data.tetherBalance ?? "0",
                  "ether"
                )}
              </div>
              <div>
                {context.web3?.utils.fromWei(
                  data.stakingBalance ?? "0",
                  "ether"
                )}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.bgColorPrimary}>teste</div>
        </Grid>
      </Grid>
    );
  }
}
